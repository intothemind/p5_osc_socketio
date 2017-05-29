function getHost(){
	var htw = false;
	var screenpro = false;
	var intothemind = true;

	if(intothemind){
		return '10.0.1.2:8080';
	}
	else if(screenpro){
		//TODO put ip of screenpro network
		return '127.0.0.1:8080';
	}
	else if(htw){
		return '10.0.143.18:8080';
	}
	else return '127.0.0.1:8080';
}