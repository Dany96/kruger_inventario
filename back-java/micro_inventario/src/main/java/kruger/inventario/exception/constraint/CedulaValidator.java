package kruger.inventario.exception.constraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import kruger.inventario.util.Util;

public class CedulaValidator implements ConstraintValidator<CedulaVerificador, Object> {
	@Override
	public void initialize(CedulaVerificador constraintAnnotation) {
	}

	@Override
	public boolean isValid(Object value, ConstraintValidatorContext context) {
		Util util = new Util();
		if (util.verificarCedula(value.toString())) {
			return true;
		} else {
			return false;
		}
	}
}