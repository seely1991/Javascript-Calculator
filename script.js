//negative sign needs to not transfer to the previous display
//after = sign, needs to transfer to previous numbers on operator

let operator = null; //holds +, - , *, /, =, or 'done'
let operatorWait = false; //variable to know whether to wait for additional operator inputs or execute math
let stringMath = false; //variable to know when math operations are being strung together (determining how things should print to the display)

function doMath() {
	const num1 = Number($("#display-previous").text());
	const num2 = Number($("#display").text());
	switch (operator) {
		case ('+'):
			return num1 + num2;
			break;
		case ('-'):
			return num1 - num2;
			break;
		case ('*'):
			return num1 * num2;
			break;
		case ('/'):
			return num1 / num2;
			break;
	};
}

function equals() {
	const places = 7;
	let x = doMath();
	if (x % 1 > 0) {
		console.log('rounded')
		x = Math.round(x*Math.pow(10, places))/Math.pow(10, places)
	};
	$("#display-previous").html(0);
	$("#display").html(x);
	operatorWait = false;
}

function clear() {
	$("#display").html('0');
	$("#display-previous").html('0');
	operator = null;
}

$("#clear").on('click', clear);

$(".math-btn").on('click', function() {
	if ($("#display").text() === '0' || operator == 'done') {
		$("#display").html(this.value);
		if (operator == 'done') {operator = null}
	}else if (operator == '=' || stringMath == true){
		$("#display-previous").html($("#display").text());
		$("#display").html(this.value);
		stringMath = false;
	}else{
		$("#display").append(this.value)
	};
	operatorWait = false;
})

$("#decimal").on('click', function() {
	const decimals = $("#display").text().match(/\./g);
	if (decimals == null || decimals.length == 0) {
	if (operator == '='){
		$("#display").html(this.value);
		operator = null;
	}else{
		$("#display").append(this.value)
	}
	}
})

$(".operator-btn").on('click', function() {
	if (this.value == '-' && $("#display").text() === '0' && operator == null || $("#display").text() == '-') {
		$("#display").html('-')
	}else{
		if (operatorWait == true) {
		operator = this.value;
		}else{
			if (operator != null) {
			equals();
			operator = this.value;
			stringMath = true;
			}else{
				$("#display-previous").html($("#display").text());
				$("#display").html('0');
				operator = this.value;
				operatorWait = true;
			}
		};
	}
})



$("#equals").on('click', function() {
	equals();
	operator = 'done';
})