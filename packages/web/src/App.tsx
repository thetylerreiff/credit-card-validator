import {
  Field as FormikField,
  Form as FormikForm,
  Formik, FormikHelpers
} from 'formik';
import { validate } from './helper';
import { FormValues } from './types';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Form = styled(FormikForm)`
  display: grid;
  gap: 1.5rem;
`;

const Field = styled(FormikField)`
  width: 100%;
`

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: red;
`;

function App() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleValidate = async (values: FormValues) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    return new Promise((resolve) => {
      timeoutRef.current = setTimeout(async () => {
        const errors = await validate(values)
        resolve(errors)
      }, 500)
    })
  }

  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    toast.success(`${values.cardNumber} is a valid card number`)
    setSubmitting(false)
  }

  return (
    <Container>
      <h1>Credit Card Validator</h1>
      <Formik<FormValues>
        initialValues={{ cardNumber: '' }}
        validate={handleValidate}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, errors }) => (
          <Form>
            <div>
              <Field name="cardNumber" />
              {errors?.cardNumber && <ErrorMessage>{errors?.cardNumber}</ErrorMessage>}
            </div>
            <button type="submit" disabled={!isValid || isSubmitting} >Submit</button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default App;
