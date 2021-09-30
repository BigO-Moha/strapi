import React from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from '@strapi/helper-plugin';
import { Box } from '@strapi/parts/Box';
import { Stack } from '@strapi/parts/Stack';
import { Main } from '@strapi/parts/Main';
import { Row } from '@strapi/parts/Row';
import { Link } from '@strapi/parts/Link';
import { Button } from '@strapi/parts/Button';
import { TextInput } from '@strapi/parts/TextInput';
import { H1, Text } from '@strapi/parts/Text';
import { Formik } from 'formik';
import UnauthenticatedLayout, {
  Column,
  LayoutContent,
} from '../../../../layouts/UnauthenticatedLayout';
import Logo from '../Logo';

const ForgotPassword = ({ onSubmit, schema }) => {
  const { formatMessage } = useIntl();

  return (
    <UnauthenticatedLayout>
      <Main>
        <LayoutContent>
          <Formik
            enableReinitialize
            initialValues={{
              email: '',
            }}
            onSubmit={onSubmit}
            validationSchema={schema}
            validateOnChange={false}
          >
            {({ values, errors, handleChange }) => (
              <Form noValidate>
                <Column>
                  <Logo />
                  <Box paddingTop={6} paddingBottom={7}>
                    <H1>
                      {formatMessage({
                        id: 'Auth.form.button.password-recovery',
                        defaultMessage: 'Password Recovery',
                      })}
                    </H1>
                  </Box>
                  {errors.errorMessage && (
                    <Text id="global-form-error" role="alert" tabIndex={-1} textColor="danger600">
                      {formatMessage({
                        id: errors.errorMessage,
                        defaultMessage: 'An error occurred',
                      })}
                    </Text>
                  )}
                </Column>

                <Stack size={6}>
                  <TextInput
                    error={
                      errors.email
                        ? formatMessage({
                            id: errors.email,
                            defaultMessage: 'This email is invalid.',
                          })
                        : ''
                    }
                    value={values.email}
                    onChange={handleChange}
                    label={formatMessage({ id: 'Auth.form.email.label', defaultMessage: 'Email' })}
                    placeholder={formatMessage({
                      id: 'Auth.form.email.placeholder',
                      defaultMessage: 'kai@doe.com',
                    })}
                    name="email"
                    required
                  />
                  <Button type="submit" fullWidth>
                    {formatMessage({
                      id: 'Auth.form.button.forgot-password',
                      defaultMessage: 'Send Email',
                    })}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </LayoutContent>
        <Row justifyContent="center">
          <Box paddingTop={4}>
            <Link to="/auth/login">
              <Text small>
                {formatMessage({ id: 'Auth.link.ready', defaultMessage: 'Ready to sign in?' })}
              </Text>
            </Link>
          </Box>
        </Row>
      </Main>
    </UnauthenticatedLayout>
  );
};

ForgotPassword.defaultProps = {
  onSubmit: e => e.preventDefault(),
};

ForgotPassword.propTypes = {
  onSubmit: PropTypes.func,
  schema: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default ForgotPassword;