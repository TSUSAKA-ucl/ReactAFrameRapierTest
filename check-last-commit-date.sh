#!/usr/bin/bash
# github.comのリポジトリ内の特定のファイルの最終更新日を調べるスクリプト
# 調べたいユーザー名($1)とファイル名($2)を設定
#
# 追加機能として、
# 第一引数が(-g)の場合は、$2がユーザー名/リポジトリで、$3がファイルのフルパスとして
# ファイルをgetする。
#
if [ $# -lt 2 ]; then
	echo "Usage: $0 <GitHubユーザー名> <調べたいファイル名>"
	exit 1
fi
if [ $1 = "-g" ]; then
    if [ $# -ne 3 ]; then
	echo "Usage: $0 -g <GitHubユーザー名/リポジトリ> <調べたいファイルのフルパス>"
	exit 1
    fi
    REPO="$2"
    FILE_PATH="$3"
    # DOWNLOAD_URL=$(gh api "repos/${REPO}/contents/${FILE_PATH}" -F "per_page=100" -F "page=1" --jq '.download_url' 2>/dev/null)
    DOWNLOAD_URL=$(gh api "repos/${REPO}/contents/${FILE_PATH}" --jq '.download_url' 2>/dev/null)
    if [ -n "$DOWNLOAD_URL" ]; then
	BASENAME=$(basename "$FILE_PATH")
	if [ -e "$BASENAME" ]; then
	    echo "File already exists: $BASENAME"
	else
	    curl -sL "$DOWNLOAD_URL" -o "$BASENAME"
	    echo "Downloaded: $BASENAME"
	fi
    else
	echo "Error: Could not retrieve download URL for ${REPO}/${FILE_PATH}"
	exit 1
    fi
    exit 0
fi

USER="$1"
FILE="$2"
export NO_COLOR=1
export GH_FORCE_TTY=1
# 簡易的にファイル名を正規表現(BRE)に変換 sed 's/[.*+?^$|()\[\]{}\\]/\\&/g'
FILE_regexp=`echo "$FILE" | sed -e 's/[.*^$|\[\]\\]/\\&/g'`
echo gh search code "filename:$2" --owner="$1" '|' grep -F "$1"
Repos=()
Paths=()
while read repo path rest; do
    Repos+=("$repo")
    Paths+=("$path")
done < <(gh search code "filename:$2" --owner="$1" | grep -F "$1")
i=0
while [ $i -lt ${#Repos[@]} ]; do
    repo_full="${Repos[$i]}"
    path="${Paths[$i]}"
    i=$((i + 1))
    echo "=================================================="
    echo "Repository: ${repo_full}  Path: ${path}"
    
    # 1. リポジトリ全体の最新コミット日付を取得
    repo_latest=$(gh api "repos/${repo_full}/commits?per_page=1" --jq '.[0].commit.committer.date' 2>/dev/null)
    echo "  リポジトリの最新更新日: ${repo_latest:-"取得失敗（空のリポジトリなど）"}"
    
    # 2. そのファイルが最後に変更されたコミット日付を取得
    file_latest=$(gh api "repos/${repo_full}/commits" --method GET -F "path=${path}" -F "per_page=1" --jq '.[0].commit.committer.date' 2>/dev/null)
    echo "  ファイルの最終変更日  : ${file_latest:-"取得失敗（ファイルパス違いなど）"}"


    file_info=$(gh api "repos/${repo_full}/contents/${path}" --method GET 2>/dev/null)
    
    if [ -n "$file_info" ]; then
        # GitHubが持つBlob SHA (SHA-1) を抽出
        git_sha=$(echo "$file_info" | gh auth json --jq '.sha' 2>/dev/null || echo "$file_info" | grep -o '"sha": *"[^"]*"' | head -1 | cut -d'"' -f4)
        echo "  GitHub SHA-1 (Blob)   : ${git_sha}"
        
        # Base64で格納されているファイル内容をデコードして、ローカルでSHA-256を計算
        # (Mac環境の base64 コマンドの違いを吸収するため、環境に合わせて自動パース)
        sha256_val=$(echo "$file_info" | grep -o '"content": *"[^"]*"' | head -1 | cut -d'"' -f4 | tr -d '\n' | (base64 -d 2>/dev/null || base64 --decode 2>/dev/null) | sha256sum | cut -d' ' -f1)
        echo "  ファイル内容 SHA-256   : ${sha256_val}"
    else
        echo "  [エラー] ファイル情報の取得に失敗しました"
    fi




done
echo "=================================================="
#
# このスクリプトはforkしてきたリポジトリは表示されないかもしれない。
# forkしてきたリポジトリに関しては
# gh api "users/nkawa/repos" --method GET -F "per_page=100" -F "page=1" \
#	--jq '.[] | select(.fork == true) | .full_name'
# のようにforkリポジトリの一覧を取り出して確認する
