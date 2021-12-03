import React from 'react';
import {
	Button,
  FormFeedback,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from 'reactstrap';
import { useFormik } from 'formik';

export default function AddOpinionModel({
	modal,
	setModal,
	submit,
	className,
}) {
	const toggle = () => setModal(!modal);
	const formik = useFormik({
		initialValues: {
			text: '',
			aspect0: `1`,
			aspect1: `1`,
			aspect2: `1`,
			aspect3: `1`,
			aspect4: `1`,
			aspect5: `1`,
		},
    validate: (values => {
      const errors = {};
      if(!values.text) {
        errors.text = 'Required'
      }
      return errors;
    }),
		onSubmit: (values, {resetForm}) => {
      toggle();
			submit(values);
      resetForm({});
		},
	});
	return (
		<Modal
			isOpen={modal}
			toggle={toggle}
			className={className + ' add-opinion-models'}
		>
			<ModalHeader toggle={toggle}>Add new opinion</ModalHeader>
			<ModalBody>
				<FormGroup>
					<Label htmlFor="text">Opinion:</Label>
					<Input
						type="textarea"
						name="text"
						onChange={formik.handleChange}
						value={formik.values.text}
						id="text"
						placeholder="Enter opinion"
            invalid={formik.errors.text}
					/>
          <FormFeedback invalid>Required!!!</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="aspect0">Price</Label>
					<Input
						type="select"
						name="aspect0"
						onChange={formik.handleChange}
						value={formik.values.aspect0}
						id="aspect0"
					>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="aspect1">Service</Label>
					<Input
						type="select"
						name="aspect1"
						onChange={formik.handleChange}
						value={formik.values.aspect1}
						id="aspect1"
					>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="aspect2">Safety</Label>
					<Input
						type="select"
						name="aspect2"
						onChange={formik.handleChange}
						value={formik.values.aspect2}
						id="aspect2"
					>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="aspect3">Quality</Label>
					<Input
						type="select"
						name="aspect3"
						onChange={formik.handleChange}
						value={formik.values.aspect3}
						id="aspect3"
					>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="aspect4">Delivery</Label>
					<Input
						type="select"
						name="aspect4"
						onChange={formik.handleChange}
						value={formik.values.aspect4}
						id="aspect4"
					>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</Input>
				</FormGroup>
				<FormGroup>
					<Label htmlFor="aspect5">Authenticity</Label>
					<Input
						type="select"
						name="aspect5"
						onChange={formik.handleChange}
						value={formik.values.aspect5}
						id="aspect5"
					>
						<option value="1">Yes</option>
						<option value="0">No</option>
					</Input>
				</FormGroup>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={formik.handleSubmit}>
					Add
				</Button>
				<Button color="secondary" onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
}
