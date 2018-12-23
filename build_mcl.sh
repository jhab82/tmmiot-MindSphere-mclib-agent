#!/bin/bash
	OPENSSL_DIR="/home/pi/tmmiot/MindSphere/tmmiotAgent/build/openssl"
	CURL_DIR="/home/pi/tmmiot/MindSphere/tmmiotAgent/build/curl"
	MCL_SOURCE_DIR="/home/pi/tmmiot/MindSphere/tmmiotAgent/MCL_Core"
	MCL_BUILD_DIR="/home/pi/tmmiot/MindSphere/tmmiotAgent/build/mcl"
	if [ -d ${MCL_BUILD_DIR} ]; then
		sudo rm -rf ${MCL_BUILD_DIR}
	fi
	sudo mkdir ${MCL_BUILD_DIR}
	sudo chmod 777 ${MCL_BUILD_DIR}
	cd ${MCL_BUILD_DIR}
	cmake -DCMAKE_PREFIX_PATH="${OPENSSL_DIR};${CURL_DIR}" -DCMAKE_BUILD_TYPE=Release -DMCL_STATICLIB=OFF -DMCL_USE_LIBCURL=ON -DMCL_USE_OPENSSL=ON -DMCL_CREATE_DOXYGEN=OFF -DMCL_TESTING=OFF -DMCL_LOG_UTIL_LEVEL=MCL_LOG_UTIL_LEVEL_NONE ${MCL_SOURCE_DIR}
	cmake --build . --target mc

