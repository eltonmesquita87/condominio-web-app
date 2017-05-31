
function GlobalConstants() {
}

GlobalConstants.EXCEEDED_HEIGHT = 200;

function inicializaPortal() {
	menu();
	inicializaFundoAguarde();
	inicializaTamanhoAba();
	inicializaPopupMensagem();
}

function inicializaFundoAguarde() {
	window.addEventListener("resize", resizePopup);
	window.addEventListener("scroll", resizePopup);
}

function resizePopup(e) {
	$("#fundoAguarde").css({ "height" : globalHeight() + "px" });
}

function inicializaPopupMensagem() {
	window.addEventListener("resize", resizePopupMensagem);
	window.addEventListener("scroll", resizePopupMensagem);
}

function resizePopupMensagem(e) {
	$("#contentMensagemSistema").css({ "margin-top" : ((window.innerHeight / 2) - 100) + "px" });
}

function inicializaTamanhoAba() {
	window.addEventListener("resize", resizeAba);
	window.addEventListener("scroll", resizeAba);
}

function resizeAba() {
	var frame = window.getPortal().getCurrentFrame();
	if(frame === null || frame === undefined) return;
	var height = (window.innerHeight - GlobalConstants.EXCEEDED_HEIGHT);
	frame.setAttribute("style", "height: " + height + "px !important");
}