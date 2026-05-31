param(
    [string]$message = "Update app"
)

git add .
git commit -m $message
git push
