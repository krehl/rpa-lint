const StyleRuleFactory = require( "../app/StyleRuleFactory.js" ).StyleRuleFactory;

const WorkflowsShouldNotContainCodeActivities = require(
  "../app/rules/WorkflowsShouldNotContainCodeActivities.js"
).WorkflowsShouldNotContainCodeActivities;

const assert = require( "assert" );
const fs = require( "fs" );

/**
 * Test the class that checks the style rule warning of code based activities.
 */
describe( "WorkflowsShouldNotContainCodeActivities", function() {

  /**
   * Test the constructor.
   */
  describe( "#constructor", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        new WorkflowsShouldNotContainCodeActivities();
      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        new WorkflowsShouldNotContainCodeActivities( new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test the checkStyle function.
   */
  describe( "#checkStyleRule", function() {
    it( "should throw an error if the parameter is not supplied", function() {
      assert.throws( function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule();

      }, TypeError );
    } );

    it( "should throw an error if the parameter is not a function", function() {
      assert.throws( function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        styleCheck.checkStyleRule(  new Object() );
      }, TypeError );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getLenientMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( matches ) );
        assert.equal( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with zero matching nodes", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.equal( lenientMatches.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an array with zero matching nodes", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getLenientMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let lenientMatches = styleCheck.getLenientMatches();

        assert.ok( Array.isArray( lenientMatches ) );
        assert.equal( lenientMatches.length, 0 );

      } );
    } );
  } );

  /**
   * Test getting an array of lenient matching Property nodes from the test file.
   */
  describe( "#getStrictMatches", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let matches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( matches ) );
        assert.equal( matches.length, 0 );

      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an array with zero matching nodes", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let strictMatches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( strictMatches ) );
        assert.equal( strictMatches.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an array with four matching nodes", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        assert.ok( Array.isArray( styleCheck.getStrictMatches() ) );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let strictMatches = styleCheck.getStrictMatches();

        assert.ok( Array.isArray( strictMatches ) );
        assert.equal( strictMatches.length, 4 );

      } );
    } );
  } );

  /**
   *  Test getting an array of warnings.
   */
  describe( "#getWarnings", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.equal( warnings.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.equal( warnings.length, 0 );

      } );
    } );

    context( "With invalid XAML to process", function() {
      it( "should return an array with four elements", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let warnings = styleCheck.getWarnings();

        assert.ok( Array.isArray( warnings ) );
        assert.equal( warnings.length, 4 );

      } );
    } );
  } );

  /**
   *  Test getting an array of warnings.
   */
  describe( "#getErrors", function() {

    context( "With no XAML processed", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.equal( errors.length, 0 );
      } );
    } );

    context( "With valid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/uno.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.equal( errors.length, 0 );

      } );
    } );

    context( "With invvalid XAML to process", function() {
      it( "should return an empty array", function() {
        let styleCheck = new WorkflowsShouldNotContainCodeActivities(
          StyleRuleFactory.getXpathProcessor()
        );

        let xamlContent = fs.readFileSync( "./test/artefacts/dos.xaml" );
        styleCheck.checkStyleRule( xamlContent.toString() );

        let errors = styleCheck.getErrors();

        assert.ok( Array.isArray( errors ) );
        assert.equal( errors.length, 0 );

      } );
    } );
  } );
} );