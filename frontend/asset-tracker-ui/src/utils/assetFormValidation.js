const STATUS_OPTIONS = ['AVAILABLE', 'ASSIGNED', 'MAINTENANCE'];

export function validateAssetFormStep(formValues, stepToValidate, reviewChecked) {
  const errors = {};

  if (stepToValidate === 1) {
    if (!formValues.assetTag?.trim()) {
      errors.assetTag = 'Asset tag is required.';
    } else if (!/^[A-Z0-9-]+$/.test(formValues.assetTag.trim())) {
      errors.assetTag = 'Use uppercase letters, numbers and hyphens only.';
    }

    if (!formValues.name?.trim()) {
      errors.name = 'Asset name is required.';
    } else if (formValues.name.trim().length < 3) {
      errors.name = 'Asset name must be at least 3 characters.';
    }

    if (!formValues.category?.trim()) {
      errors.category = 'Category is required.';
    }

    if (!formValues.serialNumber?.trim()) {
      errors.serialNumber = 'Serial number is required.';
    }
  }

  if (stepToValidate === 2) {
    if (!formValues.location?.trim()) {
      errors.location = 'Location is required.';
    }

    if (!STATUS_OPTIONS.includes(formValues.status)) {
      errors.status = 'Choose a valid status.';
    }

    if (formValues.assignedTo?.trim() && !formValues.assignedTo.includes('@')) {
      errors.assignedTo = 'Assigned user should look like an email address.';
    }
  }

  if (stepToValidate === 3 && !reviewChecked) {
    errors.review = 'Please confirm that you reviewed the asset details.';
  }

  return errors;
}
