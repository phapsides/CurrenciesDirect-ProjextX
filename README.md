# CD Prototype



### Install

	npm install -g nodemon
	npm install


#### Run Dev

	gulp

...then visit:

	* View: [http://localhost:1035/](http://localhost:1035/)
	* BrowserSync: ...and visit [http://localhost:1037/](http://localhost:1037/)


#### Run

Choose from a, b or c:

	a. npm start
	b. node index.js
	c. npm install -g nodemon

...visit http://localhost:1035/



#### Production

_TODO: environment variables_

	npm install -g forever
	forever start -c "nodemon --exitcrash" index.js

...and visit [http://localhost:1035/](http://localhost:1035/)




##### Production Server 

Location: ssh -i suseinstance.pem ec2-user@ec2-34-249-88-148.eu-west-1.compute.amazonaws.com
Pem: suseinstance.pem




# Server Files Path
/home/ec2-user/currencies-direct-incubator/project-x
