import { BaseStyleRule } from "./BaseStyleRule.js";
import * as util from "util";

/**
 * A class to implement the rule that variable names must start with a lower case letter.
 */
export class VariablesMustStartLowerCase extends BaseStyleRule {

  /**
   * Construct a new VariablesMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "//xaml:Variable";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {

    let errors = [];

    // Check the names of the variables.
    if ( this.lenientMatches.length > 0 ) {
      let variablesList = this.getAttributeValues( "Name", this.lenientMatches );

      let self = this;

      variablesList.forEach( function( name ) {
        if ( !self.isFirstCharLowerCase( name ) ) {
          errors.push(
            util.format( "The variable name '%s' must start with a lower case letter.", name )
          );
        }
      } );

    }

    return errors;
  }

  /**
   * Check to see if the supplied string starts with a lower case letter.
   *
   * @param {string} value The string to evaluate.
   * @returns {boolean} True if the string starts with a lower case letter.
   * @throws {TypeError} Parameter value is required and must be a string.
   * @since 1.0.0
   */
  isFirstCharLowerCase( value ) {
    if ( !value || typeof( value ) !== "string" ) {
      throw new TypeError( "value parameter is required and must be a string" );
    }

    let returnFlag = false;
    let firstChar = value.charAt( 0 );

    if ( firstChar === firstChar.toLowerCase() &&
         firstChar !== firstChar.toUpperCase() ) {
      returnFlag = true;
    }

    return returnFlag;
  }
}