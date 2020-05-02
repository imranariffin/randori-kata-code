build:
	docker build -t imranariffin/randori-kata-code .
up:
	docker run -p 3000:3000 -d --name randori-kata-code imranariffin/randori-kata-code
