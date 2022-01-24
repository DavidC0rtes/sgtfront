import CustomHeading from '../components/CustomHeading'
import EmployeeForm from '../components/forms/Employee'

const Employee = () => {
    return (
        <div>
            <CustomHeading
                margin='0.8em auto 1em'
                size='4xl'
                text='Ingresa tus datos' />
            <EmployeeForm />
        </div>
    )
}

export default Employee
