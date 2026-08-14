import { describe, expect, it } from 'vitest';
import { validateAssetFormStep } from './assetFormValidation.js';

describe('validateAssetFormStep', () => {
  it('returns errors for required step 1 fields', () => {
    const errors = validateAssetFormStep({}, 1, false);

    expect(errors).toEqual({
      assetTag: 'Asset tag is required.',
      name: 'Asset name is required.',
      category: 'Category is required.',
      serialNumber: 'Serial number is required.'
    });
  });

  it('returns step-specific validation errors for step 1 and step 2', () => {
    const step1Errors = validateAssetFormStep(
      {
        assetTag: 'bad tag',
        name: 'AB',
        category: 'Electronics',
        serialNumber: 'SN-001',
        status: 'AVAILABLE',
        location: 'HQ',
        assignedTo: 'not-an-email'
      },
      1,
      false
    );

    expect(step1Errors.assetTag).toBe('Use uppercase letters, numbers and hyphens only.');
    expect(step1Errors.name).toBe('Asset name must be at least 3 characters.');

    const step2Errors = validateAssetFormStep(
      {
        assetTag: 'AT-100',
        name: 'Laptop',
        category: 'Electronics',
        serialNumber: 'SN-001',
        status: 'AVAILABLE',
        location: 'HQ',
        assignedTo: 'not-an-email'
      },
      2,
      false
    );

    expect(step2Errors.assignedTo).toBe('Assigned user should look like an email address.');
  });

  it('returns a review error when the review checkbox is not checked', () => {
    const errors = validateAssetFormStep(
      {
        assetTag: 'AT-100',
        name: 'Laptop',
        category: 'Electronics',
        serialNumber: 'SN-100',
        status: 'AVAILABLE',
        location: 'HQ',
        assignedTo: ''
      },
      3,
      false
    );

    expect(errors.review).toBe('Please confirm that you reviewed the asset details.');
  });
});
