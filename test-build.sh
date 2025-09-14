#!/bin/bash

echo "Testing GitBook build locally..."
echo "================================"

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js 14 or later"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if GitBook CLI is installed
if ! command -v gitbook &> /dev/null; then
    echo "📦 Installing GitBook CLI..."
    npm install -g gitbook-cli@2.3.2
fi

echo "✅ GitBook CLI installed"

# Fetch GitBook version
echo "📚 Fetching GitBook 3.2.3..."
gitbook fetch 3.2.3

# Install plugins
echo "🔌 Installing plugins..."
gitbook install

# Try to build
echo "🔨 Building GitBook..."
if gitbook build . ./test-build; then
    echo "✅ GitBook build successful!"
    echo "Files generated in ./test-build directory"
    ls -la test-build/
    
    # Clean up test build
    rm -rf test-build
else
    echo "❌ GitBook build failed"
    echo "The GitHub Actions workflow will use the fallback HTML page"
fi

echo "================================"
echo "Test complete!"