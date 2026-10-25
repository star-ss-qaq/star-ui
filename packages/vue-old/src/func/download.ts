export default function(data:Blob|Uint8Array, name:string): void{
	let out:Blob;
	if (data instanceof Uint8Array) {
		out = new Blob([data]);
	} else {
		out = data;
	}
	const link = document.createElement('a');
	link.href = URL.createObjectURL(out);
	link.download = name;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
}