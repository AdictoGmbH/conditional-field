class ConditionalField {
	constructor(args) {
		this.controls = document.querySelectorAll(args.control);

		if (this.controls.length == 0) return;

		this.args = args;
		this.inputType = this.getInputType();
		this.setVisible(this.inputValue());

		this.onChangeBound = this.onChange.bind(this);

		Array.prototype.slice.call(this.controls).forEach((control) => {
			control.addEventListener('change', this.onChangeBound);
		});
	}

	onChange(e) {
		const value = this.inputValue();
		this.setVisible(value);
	}

	setVisible(value) {
		for (let controlValue in this.args.visibility) {
			const targets = document.querySelectorAll(this.args.visibility[controlValue]);
			[].forEach.call(targets, (t) => {
				t.style.display = 'none';
			});
		}

		for (let controlValue in this.args.visibility) {
			if (value == controlValue) {
				const targets = document.querySelectorAll(this.args.visibility[controlValue]);
				[].forEach.call(targets, (t) => {
					t.style.display = 'block';
				});
			}
		}
	}

	getInputType() {
		if (this.controls[0].tagName === 'SELECT') {
			return 'select';
		} else if (this.controls[0].getAttribute('type') === 'radio') {
			return 'radio';
		} else if (this.controls[0].getAttribute('type') === 'checkbox') {
			return 'checkbox';
		}
	}

	inputValue() {
		let value = '';
		switch (this.inputType) {
			case 'checkbox':
				value = this.controls[0].checked ? 'on' : 'off';
				break;
			case 'radio':
				value = Array.prototype.slice.call(this.controls).filter((control) => {
					return control.checked
				}).map((control) => {
					return control.value
				});
				break;
			default:
				value = this.controls[0].value;
		}
		return value;
	}

	destroy() {
		Array.prototype.slice.call(this.controls).forEach((control) => {
			control.removeEventListener('change', this.onChangeBound);
		});
	}
}