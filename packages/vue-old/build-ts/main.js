const fs = require('fs');
const path = require('path');
const srcDir="./src";
const outDir="./out";
const alias = JSON.parse(fs.readFileSync('./tsconfig.json')).compilerOptions.paths;
var down = [];
var task = ["/main.ts"];
while(task.length){
	const file=task.pop();
	if(down.indexOf(file) != -1) continue;
	let fileData = fs.readFileSync(path.join(srcDir, file), "utf8");
	let outfile=path.join(outDir, file);
	if(file.endsWith(".vue")){
		//fileData
		fileData=fileData.substring(fileData.indexOf("<script lang=\"ts\">")+18,fileData.lastIndexOf("</script>"));
		outfile+=".ts";
	}
	fileData=fileData.replace(/(?:import|export) (?:.+?) from "(.+?)"/g,function(row,importFile){
		if(alias){
			Object.keys(alias).find(key => {
				const _key = key.replace("*","");
				if(importFile.startsWith(_key)){
					const _r = path.relative(path.resolve(path.dirname(path.join(srcDir, file))),path.resolve(alias[key][0].replace("*","")));
					const r = _r.replace(/\\/g, "/");
					row = row.replace(`from "${_key}`,`from "${r}/`);
					importFile = importFile.replace(_key, `${r}/`);
					return true;
				}
				return false;
			});
		}
		if(!importFile.startsWith(".")){
			return row;
		}
		let importFile_ = path.join(path.dirname(file), importFile);
		if(importFile.lastIndexOf(".")<=importFile.lastIndexOf("/")){
			const base = path.join(srcDir, importFile_);
			if(fs.existsSync(base+".ts")){
				importFile_+=".ts";
			}else if(fs.existsSync(base+".tsx")){
				importFile_+=".tsx";
			}else if(fs.existsSync(base+".d.ts")){
				importFile_+=".d.ts";
			}else if(fs.existsSync(base+"/index.ts")){
				importFile_+="/index.ts";
			}
		}
		task.push(importFile_);
		return row;
	});
	try{
		makdir(path.dirname(outfile));
	}catch(e){
		//nothin to do
	}
	down.push(file);
	fs.writeFileSync(outfile, fileData, {flag: "w+"});
}
function makdir(pathName){
	if (fs.existsSync(pathName)) return;
	makdir(path.dirname(pathName));
	fs.mkdirSync(pathName);
}
