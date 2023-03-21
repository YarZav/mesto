// Private

function isPopupValid(popup) {
    return getPopupName(popup).validity.valid && getPopupDescription(popup).validity.valid;
}