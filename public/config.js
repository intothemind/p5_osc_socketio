function getHost(){
	var htw = false;
	var screenpro = true;
	var intothemind = false;

	if(intothemind){
		return '10.0.1.4:8080';
	}
	else if(screenpro){
		//TODO put ip of screenpro network
		return '192.168.60.102:8080';
	}
	else if(htw){
		return '10.0.143.18:8080';
	}
	else return '127.0.0.1:8080';
}