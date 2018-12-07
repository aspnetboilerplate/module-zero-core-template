# 设置输出格式
$OutputEncoding = [Text.UTF8Encoding]::UTF8

## 公共参数

# 替换前的公司名称
$oldCompanyName="AbpCompanyName"
# 替换后的公司名称
$newCompanyName="YourCompanyName"

# 替换前的项目名称
$oldProjectName="AbpProjectName"
# 替换后的项目名称
$newProjectName="YourProjectName"

# 文件类型名称
$fileType="FileInfo"

# 目录类型名称
$dirType="DirectoryInfo"

#复制一份
Write-Host '开始复制文件夹'
$newRoot=$newCompanyName+"."+$newProjectName
mkdir $newRoot
Copy-Item -Recurse .\aspnet-core\ .\$newRoot\
Copy-Item -Recurse .\vue\ .\$newRoot\
Copy-Item .gitignore .\$newRoot\
Copy-Item LICENSE .\$newRoot\
Copy-Item README.md .\$newRoot\

# sln所在目录
$slnFolder = (Get-Item -Path "./$newRoot/aspnet-core/" -Verbose).FullName
$vueFolder = (Get-Item -Path "./$newRoot/vue/" -Verbose).FullName

function Rename {
	param (
		$TargetFolder,
		$PlaceHolderCompanyName,
		$PlaceHolderProjectName,
		$NewCompanyName,
		$NewProjectName
	)
	# 需要修改文件内容的文件后缀名
	$include=@("*.cs","*.cshtml","*.asax","*.ps1","*.ts","*.csproj","*.sln","*.xaml","*.json","*.js","*.xml","*.config","Dockerfile")

	$elapsed = [System.Diagnostics.Stopwatch]::StartNew()

	Write-Host "[$TargetFolder]开始重命名文件夹"
	# 重命名文件夹
	Ls $TargetFolder -Recurse | Where { $_.GetType().Name -eq $dirType -and ($_.Name.Contains($PlaceHolderCompanyName) -or $_.Name.Contains($PlaceHolderProjectName)) } | ForEach-Object{
		Write-Host 'directory ' $_.FullName
		$newDirectoryName=$_.Name.Replace($PlaceHolderCompanyName,$NewCompanyName).Replace($PlaceHolderProjectName,$NewProjectName)
		Rename-Item $_.FullName $newDirectoryName
	}
	Write-Host "[$TargetFolder]结束重命名文件夹"
	Write-Host '-------------------------------------------------------------'


	# 替换文件中的内容和文件名
	Write-Host "[$TargetFolder]开始替换文件中的内容和文件名"
	Ls $TargetFolder -Include $include -Recurse | Where { $_.GetType().Name -eq $fileType} | ForEach-Object{
		$fileText = Get-Content $_ -Raw -Encoding UTF8
		if($fileText.Length -gt 0 -and ($fileText.contains($PlaceHolderCompanyName) -or $fileText.contains($PlaceHolderProjectName))){
			$fileText.Replace($PlaceHolderCompanyName,$NewCompanyName).Replace($PlaceHolderProjectName,$NewProjectName) | Set-Content $_ -Encoding UTF8
			Write-Host 'file(change text) ' $_.FullName
		}
		If($_.Name.contains($PlaceHolderCompanyName) -or $_.Name.contains($PlaceHolderProjectName)){
			$newFileName=$_.Name.Replace($PlaceHolderCompanyName,$NewCompanyName).Replace($PlaceHolderProjectName,$NewProjectName)
			Rename-Item $_.FullName $newFileName
			Write-Host 'file(change name) ' $_.FullName
		}
	}
	Write-Host "[$TargetFolder]结束替换文件中的内容和文件名"
	Write-Host '-------------------------------------------------------------'

	$elapsed.stop()
	write-host "[$TargetFolder]共花费时间: $($elapsed.Elapsed.ToString())"
}

Rename -TargetFolder $slnFolder -PlaceHolderCompanyName $oldCompanyName -PlaceHolderProjectName $oldProjectName -NewCompanyName $newCompanyName -NewProjectName $newProjectName
Rename -TargetFolder $vueFolder -PlaceHolderCompanyName $oldCompanyName -PlaceHolderProjectName $oldProjectName -NewCompanyName $newCompanyName -NewProjectName $newProjectName

