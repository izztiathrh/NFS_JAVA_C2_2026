package com.example.AssetTracker.util;

/*
Validation: what inputs are allowed and what are not
Sanitisation: can this input be safely cleaned before saving/validating
"  SN-LAP-A1B2C3D4  " -> "SN-LAP-A1B2C3D4"   trim spaces
"sn-lap-a1b2c3d4"     -> "SN-LAP-A1B2C3D4"   uppercase
empty serialNumber -> reject
script tags in name -> reject, do not render as HTML
*/
public class InputSanitizer {

    private InputSanitizer() {
        // Private constructor to prevent instantiation
    }

    /**
     * Trims whitespace and converts empty results to null so blank
     * and "not provided" are treated the same way by callers.
     */
    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    public static String cleanText(String value) {
        if (value == null) {
            return null;
        }
        // Remove leading and trailing whitespace
        String cleanedValue = value.trim();
        // Escape HTML tags to prevent XSS attacks
        cleanedValue = cleanedValue.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
        return cleanedValue;
    }

    /**
     * Removes control characters (e.g. tabs, newlines, null bytes) that
     * shouldn't appear in a single-line text field.
     */
    public static String removeControlCharacters(String value) {
        if (value == null) {
            return null;
        }
        return value.replaceAll("\\p{Cntrl}", "");
    }

    /**
     * Normalises code-like fields such as serial numbers: trims spaces
     * and uppercases so "sn-lap-a1b2c3d4" and " SN-LAP-A1B2C3D4 " match.
     */
    public static String normaliseCode(String value) {
        String trimmed = trimToNull(value);
        return trimmed == null ? null : trimmed.toUpperCase();
    }

    /**
     * Validation, not sanitisation: a blank serial number is invalid
     * input and must be rejected, never silently filled in.
     */
    public static boolean isValidSerialNumber(String serialNumber) {
        return trimToNull(serialNumber) != null;
    }
}
