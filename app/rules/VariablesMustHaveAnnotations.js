import { BaseStyleRule } from "./BaseStyleRule.js";

/**
 * Class to implement the rule that requires all variables to have annotations.
 *
 */
export class VariablesMustHaveAnnotations extends BaseStyleRule {

  /**
   * Construct a new VariablesMustHaveAnnotations object.
   *
   * @param {Function} xpath An XPath object with the required namespaces defined.
   * @since 1.0.0
   */
  constructor( xpath ) {
    super( xpath );

    this.xpathMatchAll = "//xaml:Variable";
    this.xpathMatchSpecific = "//xaml:Variable[@sap2010:Annotation.AnnotationText and string-length(@sap2010:Annotation.AnnotationText)!=0]";
  }

  /**
   * Return an array of errors as a result of the style check.
   *
   * @returns {Array} An array of error strings.
   * @since 1.0.0
   */
  getErrors() {

    // Check to see if errors have been detected.
    if ( ( this.lenientMatches.length - this.strictMatches.length ) > 0 ) {
      return [
        "Variables without annotations are not allowed."
      ];
    } else {
      return [];
    }

  }

}
