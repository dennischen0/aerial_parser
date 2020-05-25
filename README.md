# aerial_parser

This repo contains some scripts to help you download and rename aerial files. I suggest you read the code before running it.

Requirements: 

1. Nodejs


First run the following to get the Aerial JSON:

```bash
$ ./download_resources.sh
```

Then, run the following to rename your aerial videos:

```bash
$ node parsejson.js /video/directory
```

Be sure to replace the argument with the video directory.