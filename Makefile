build:
	docker build -t imranariffin/randori-kata-code .
up:
	docker run \
		-p 3000:3000 \
		--name randori-kata-code \
		-d \
		--mount type=bind,source=${PWD},target=/code \
		--restart unless-stopped \
		imranariffin/randori-kata-code
