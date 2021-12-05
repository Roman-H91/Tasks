import { useState } from 'react';
import { Progress, Button } from 'antd';
import { Form, Field } from 'react-final-form';
import { CheckCircleTwoTone } from '@ant-design/icons';
import Link from 'next/link';
import MyInput from './MyInput';
import HearFrom from './HearFrom';
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import moment from 'moment';

import {
  StyledContainer,
  StyledInputFormWrapper,
  StyledInputForm,
  StyledTitle,
  StyledButtonContainer,
  StyledFinish,
  StyledHeader,
  StyledLabel,
  StyledDateContainer,
} from './styled';

const PAGE_1 = 'PAGE_1';
const PAGE_2 = 'PAGE_2';
const FINISH = 'FINISH';

export default function LoginForm() {
  const [status, setStatus] = useState({
    fields: {
      main: {
        email: {
          name: 'email',
          id: 'email',
          label: 'EMAIL',
          type: 'text',
        },
        password: {
          name: 'password',
          id: 'password',
          label: 'PASSWORD',
          type: 'password',
        },
        confirmPass: {
          name: 'confirmPass',
          id: 'confirmPass',
          label: 'CONFIRM PASSWORD',
          type: 'password',
        },
      },
      dateOfBirth: {
        day: {
          name: 'dateOfBirth.day',
          id: 'dateOfBirth.day',
          label: 'DAY',
          placeholder: 'DD',
        },
        month: {
          name: 'dateOfBirth.month',
          id: 'dateOfBirth.month',
          label: 'MONTH',
          placeholder: 'MM',
        },
        year: {
          name: 'dateOfBirth.year',
          id: 'dateOfBirth.year',
          label: 'YEAR',
          placeholder: 'YYYY',
        },
      },
    },
    pageType: PAGE_1,
    pageTitle: 'Sign up',
    progressBar: 33,
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  const validate = (values = {}) => {
    const errors = {
      dateOfBirth: {},
    };

    const day = values.dateOfBirth?.day ? values.dateOfBirth?.day : '';
    const month = values.dateOfBirth?.month ? values.dateOfBirth?.month : '';
    const year = values.dateOfBirth?.year ? values.dateOfBirth?.year : '';
    const date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
    const isValidDate = date.isValid() ? undefined : 'Invalid Date';

    // if (!(values.dateOfBirth && values.dateOfBirth.day)) {
    //   errors.dateOfBirth = { day: 'Required' };
    // }

    if (isValidDate !== undefined) {
      errors.dateOfBirth.month = 'Wrong date!';
    }

    if (!values.dateOfBirth?.day) {
      errors.dateOfBirth.day = 'Required';
    } else if (values.dateOfBirth.day.match(/^[a-zA-Z]+$/)) {
      errors.dateOfBirth.day = 'Only numbers';
    }

    if (!values.dateOfBirth?.month) {
      errors.dateOfBirth.month = 'Required';
    } else if (values.dateOfBirth.month.match(/^[a-zA-Z]+$/)) {
      errors.dateOfBirth.month = 'Only numbers';
    }

    if (!values.dateOfBirth?.year) {
      errors.dateOfBirth.year = 'Required';
    } else if (values.dateOfBirth.year.match(/^[a-zA-Z]+$/)) {
      errors.dateOfBirth.year = 'Only numbers';
    }

    if (!values.email) {
      errors.email = 'Required';
    } else if (!values.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      errors.email = 'Wrong format!';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 4) {
      errors.password = 'Must be more than 4 digits';
    }

    if (!values.confirmPass) {
      errors.confirmPass = 'Required';
    } else if (values.confirmPass.length < 4) {
      errors.confirmPass = 'Must be more than 4 digits';
    } else if (values.confirmPass !== values.password) {
      errors.confirmPass = 'Must match';
    }

    if (!values.gender) {
      errors.gender = 'Required';
    }

    if (!values.hearFrom) {
      errors.hearFrom = 'Required';
    }

    return errors;
  };

  return (
    <StyledContainer>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, errors }) => {
          return (
            <form style={{ height: '100%' }} onSubmit={handleSubmit} id='form'>
              <StyledHeader>
                <StyledTitle>{status.pageTitle}</StyledTitle>
                <Progress
                  percent={status.progressBar}
                  showInfo={false}
                  style={{ width: '400px' }}
                  strokeColor='#1890ff'
                />
              </StyledHeader>

              {status.pageType === PAGE_1 && (
                <div>
                  <StyledInputFormWrapper>
                    {Object.entries(status.fields.main).map(
                      ([_, fieldsValues]) => {
                        const { name, id, label, type } = fieldsValues;
                        console.log(fieldsValues);
                        return (
                          <MyInput
                            key={id}
                            id={id}
                            name={name}
                            label={label}
                            type={type}
                          />
                        );
                      }
                    )}
                  </StyledInputFormWrapper>

                  <StyledButtonContainer>
                    <Link href='/' passHref>
                      <Button size='large' type='link'>
                        Back
                      </Button>
                    </Link>
                    <Button
                      disabled={
                        errors.email || errors.password || errors.confirmPass
                      }
                      size='large'
                      type='link'
                      onClick={() =>
                        setStatus({
                          ...status,
                          pageType: PAGE_2,
                          progressBar: 66,
                        })
                      }
                    >
                      Next
                    </Button>
                  </StyledButtonContainer>
                </div>
              )}

              {status.pageType === PAGE_2 && (
                <div>
                  <StyledInputFormWrapper>
                    <StyledLabel htmlFor='dateOfBirth.day'>
                      DATE OF BIRTH
                    </StyledLabel>
                    <StyledDateContainer>
                      {Object.entries(status.fields.dateOfBirth).map(
                        ([_, fieldsValues]) => {
                          const { id, name, label, placeholder } = fieldsValues;
                          return (
                            <DateOfBirth
                              key={id}
                              name={name}
                              label={label}
                              placeholder={placeholder}
                            />
                          );
                        }
                      )}
                    </StyledDateContainer>
                    {/* <StyledInputForm>
                      <label htmlFor='dateOfBirth'>DATE OF BIRTH</label>
                      <Field
                        id='dateOfBirth'
                        name='dateOfBirth'
                        type='date'
                        placeholder='DD.MM.YYYY'
                        component={DateOfBirth}
                      />
                    </StyledInputForm> */}
                    <StyledLabel htmlFor='gender'>GENDER</StyledLabel>
                    <StyledInputForm>
                      <Field
                        id='gender'
                        name='gender'
                        type='radio'
                        component={Gender}
                      />
                    </StyledInputForm>
                    <StyledLabel htmlFor='hearFrom'>
                      WHERE DID YOU HEAR ABOUT US ?
                    </StyledLabel>
                    <StyledInputForm>
                      <Field
                        id='hearFrom'
                        name='hearFrom'
                        component={HearFrom}
                      />
                    </StyledInputForm>
                  </StyledInputFormWrapper>
                  <StyledButtonContainer>
                    <Button
                      type='link'
                      size='large'
                      onClick={() =>
                        setStatus({
                          ...status,
                          pageType: PAGE_1,
                          progressBar: 33,
                        })
                      }
                    >
                      Back
                    </Button>
                    <Button
                      type='link'
                      size='large'
                      disabled={
                        errors.dateOfBirth?.day ||
                        errors.dateOfBirth?.month ||
                        errors.dateOfBirth?.year ||
                        errors.gender ||
                        errors.hearFrom
                      }
                      onClick={() =>
                        setStatus({
                          pageType: FINISH,
                          pageTitle: 'Thank you!',
                          progressBar: 100,
                        })
                      }
                    >
                      Next
                    </Button>
                  </StyledButtonContainer>
                </div>
              )}

              {status.pageType === FINISH && (
                <div>
                  <StyledFinish>
                    <CheckCircleTwoTone
                      twoToneColor='#52c41a'
                      style={{ fontSize: '170px' }}
                    />
                    <Button
                      size='large'
                      htmlType='form'
                      style={{ width: '170px', marginTop: '7%' }}
                      type='submit'
                    >
                      Go to Dashboard
                    </Button>
                  </StyledFinish>
                </div>
              )}
            </form>
          );
        }}
      />
    </StyledContainer>
  );
}
