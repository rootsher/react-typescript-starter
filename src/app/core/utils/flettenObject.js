function flattenObject(src, separator = '.') {
	let result = {};
	let queue = [{ obj: src, path: [] }];

	while (queue.length > 0) {
		let entry = queue.pop();
		let parentPath = entry.path;
		let obj = entry.obj;

		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				let val = obj[key];
				let path = parentPath.concat(key);

				if (val !== null && !Array.isArray(val) && typeof val === 'object') {
					queue.push({ obj: val, path });
				} else {
					result[path.join(separator)] = val;
				}
			}
		}
	}

	return result;
}

export default flattenObject;
