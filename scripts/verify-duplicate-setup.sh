#!/bin/bash
# Duplicate Issues Detection Setup Verification Script

echo "🔍 Verifying Duplicate Issues Detection Setup..."
echo "=============================================="

# Check if we're in the right directory
if [ ! -d ".github" ]; then
    echo "❌ Error: .github directory not found. Run this script from the repository root."
    exit 1
fi

echo ""
echo "📁 Checking Configuration Files:"
echo "--------------------------------"

# List of required files
config_files=(
    ".github/duplicate-issues.yml"
    ".github/duplicates.yml"  
    ".github/duplicate-detection.yml"
    ".github/labels.yml"
    ".github/DUPLICATE_DETECTION.md"
    ".github/TESTING_GUIDE.md"
)

all_files_exist=true

for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_files_exist=false
    fi
done

echo ""
echo "🔧 Checking Workflow Files:"
echo "---------------------------"

workflow_files=(
    ".github/workflows/duplicate-issue-support.yml"
    ".github/workflows/setup-duplicate-labels.yml"
)

for file in "${workflow_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        all_files_exist=false
    fi
done

echo ""
echo "📋 Validating YAML Syntax:"
echo "-------------------------"

# Check if python3 is available
if ! command -v python3 &> /dev/null; then
    echo "⚠️  Python3 not found - skipping YAML validation"
else
    yaml_valid=true
    
    # Validate configuration files
    for file in "${config_files[@]}"; do
        if [[ "$file" == *.yml ]] && [ -f "$file" ]; then
            if python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null; then
                echo "✅ $file - Valid YAML"
            else
                echo "❌ $file - Invalid YAML"
                yaml_valid=false
            fi
        fi
    done
    
    # Validate workflow files
    for file in "${workflow_files[@]}"; do
        if [ -f "$file" ]; then
            if python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null; then
                echo "✅ $file - Valid YAML"
            else
                echo "❌ $file - Invalid YAML"
                yaml_valid=false
            fi
        fi
    done
fi

echo ""
echo "📊 Configuration Summary:"
echo "------------------------"

# Read and display key configuration values
if [ -f ".github/duplicate-issues.yml" ]; then
    if command -v python3 &> /dev/null; then
        echo "Similarity Threshold: $(python3 -c "import yaml; config=yaml.safe_load(open('.github/duplicate-issues.yml')); print(config.get('detection', {}).get('similarity_threshold', 'N/A'))")"
        echo "Search Limit: $(python3 -c "import yaml; config=yaml.safe_load(open('.github/duplicate-issues.yml')); print(config.get('detection', {}).get('search_limit', 'N/A'))")"
        echo "Comments Enabled: $(python3 -c "import yaml; config=yaml.safe_load(open('.github/duplicate-issues.yml')); print(config.get('comments', {}).get('enabled', 'N/A'))")"
    else
        echo "Python3 required to display configuration details"
    fi
else
    echo "Main configuration file not found"
fi

echo ""
echo "🎯 Final Status:"
echo "---------------"

if [ "$all_files_exist" = true ]; then
    if [ "$yaml_valid" = true ] || ! command -v python3 &> /dev/null; then
        echo "✅ Setup Complete! Duplicate detection should be ready."
        echo ""
        echo "📝 Next Steps:"
        echo "1. Verify the 'Duplicate Issues' app is installed organization-wide"
        echo "2. Run the 'Setup Duplicate Detection Labels' workflow (if needed)"
        echo "3. Test with sample issues (see TESTING_GUIDE.md)"
        exit 0
    else
        echo "❌ Setup has YAML syntax errors. Please fix the invalid files."
        exit 1
    fi
else
    echo "❌ Setup incomplete. Missing required files."
    exit 1
fi