import React from 'react';
import { getInitialProps } from 'react-i18next';
import ProfileCard from '../Components/ProfileCard';

const UserPage = (props) => {
    return (
        <div className = "container">
            <ProfileCard />
        </div>
    );
};

export default UserPage;