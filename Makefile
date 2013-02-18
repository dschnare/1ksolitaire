dschnare-js1k.min.js: dschnare-js1k.js
	java -jar compiler.jar --js dschnare-js1k.js --js_output_file dschnare-js1k.min.js --compilation_level ADVANCED_OPTIMIZATIONS --externs externs.js