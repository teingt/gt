import React from 'react';
import { signup } from '../api/apiCalls';
import Input from '../Components/Input';
import { withTranslation } from 'react-i18next';
import ButtonWithProgress from '../Components/ButtonWithProgress';
import { withApiProgress } from '../shared/ApiProgress';


class UserSignupPage extends React.Component{

    state = { 
        username: null, 
        displayName: null,
        password:null,
        passwordRepeat:null,
        errors:{}
    }
    onChange = event =>{
        const { t } = this.props;
        const {name , value} = event.target;
        const errors = {...this.state.errors}
        errors[name] = undefined
        if (name==='password' || name=== 'passwordRepeat'){
            if(name==='password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
            } else if(name === 'passwordRepaet' && value !== this.state.password){
                errors.passwordRepeat= t('Password mismatch');
            } else {
                errors.passwordRepeat=undefined;
            }
        }
        this.setState({
            [name] : value, 
            errors
        });

    };
    onClickSignUP = async event =>{
        event.preventDefault();
        const { username, displayName, password} = this.state;
        const body ={
            username,
            displayName,
            password
        };

        try {
            const response = await signup(body);
        } catch (error) {
            if(error.response.data.validationErrors){
                this.setState({errors: error.response.data.validationErrors}); 
            }

        }

    };

    render(){
        const { errors} = this.state;
        const { username, displayName, password, passwordRepeat} = errors;
        const { t, pendingApiCall } = this.props;
        return (
            <div className="container">
                <form>
                    
                    <h1 className="text-center">{t('Sign Up')}</h1>
                    <Input className="username" label={t('Username')} error={username} onChange={this.onChange}/>
                    <Input className="displayName" label={t('Display Name')} error={displayName} onChange={this.onChange}/>
                    <Input className="password" label={t('Password')} error={password} onChange={this.onChange} type="password"/>
                    <Input className="passwordRepeat" label={t('Password Repeat')} error={passwordRepeat} onChange={this.onChange} type="password" />

                        <div className="text-center">
                            <ButtonWithProgress onClick={this.onClickSignUP} 
                            disabled={pendingApiCall || passwordRepeat !== undefined} 
                            pendingApiCall= {pendingApiCall}
                            text = {t('Sign Up')} />
                            {pendingApiCall  && <span className="spinner-border spinner-border-sm"></span>} 
                        </div>                       
                </form>


            </div>
        );
    }
}

const UserSignupPageWithApiProgress = withApiProgress(UserSignupPage, '/api/1.0/users');

const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgress);
export default UserSignupPageWithTranslation; 