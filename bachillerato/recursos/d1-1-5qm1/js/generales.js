function EsiOs(){
	var userAgent = window.navigator.userAgent;
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
		return true;
	} else {
		return false;
	}
}

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function Retraso(parametros){
	setTimeout(function(){
		parametros.func();
	}, parametros.tiempo)
}