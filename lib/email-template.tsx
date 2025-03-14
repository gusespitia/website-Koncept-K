import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <div>
    <h1>Thank you for your message, {firstName}!</h1>
    <p>We will get back to you soon.</p>
  </div>
);