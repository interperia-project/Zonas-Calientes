#!/bin/bash

REMOTE_NAME="origin" # Replace with your remote name

# Check if remote branch exists
if git show-ref --verify --quiet refs/remotes/$REMOTE_NAME/$(git branch --show-current); then
    # Fetch latest changes from remote branch
    git fetch $REMOTE_NAME $(git branch --show-current)

    # Get the number of commits ahead of local branch
    NUM_COMMITS=$(git rev-list --count HEAD..$REMOTE_NAME/$(git branch --show-current))

    # If there are new commits, perform a pull
    if [ $NUM_COMMITS -gt 0 ]; then
        echo "New changes found, performing pull..."
        git pull $REMOTE_NAME $(git branch --show-current)
    else
        echo "No new changes found."
    fi
else
    echo "Remote branch $(git branch --show-current) does not exist."
fi
