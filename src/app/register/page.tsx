'use client';
import DoubleNavbar from '@/components/DoubleNavbar';
import RegisterForm from '@/components/RegisterForm';
import classes from '../page.module.css';

export default function RegisterPage() {
  return (
    <div className={classes.pageWrapper}>
      <DoubleNavbar />
      <div className={classes.pageContent}>
        <RegisterForm />
      </div>
    </div>
  );
}