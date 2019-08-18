(function () {

  function getOntologyPath({ base, standardNumber, partNumber, year, version }) {
    return `iso${standardNumber}/-${partNumber}/${year}/${version}`;
  }

  class OntologyLocator {
    constructor() {
      this.form = null;
      this.handleLocateClick = this.handleLocateClick.bind(this);
    }
    render() {
      const template = document.querySelector('#ontologyLocator');
      let el = document.importNode(template.content, true);

      this.form = el.children[0];
      this.form.querySelector('button[name=locate]').
        addEventListener('click', this.handleLocateClick);

      return el;
    }
    getInputValue(inputName) {
      return this.form.querySelector(`input[name=${inputName}]`).value;
    }
    getFormValues() {
      return {
        standardNumber: this.getInputValue('standardNumber'),
        partNumber: this.getInputValue('partNumber'),
        year: this.getInputValue('year'),
        version: this.getInputValue('version'),
      };
    }
    handleLocateClick(evt) {
      evt.preventDefault();
      window.location.href = `https://def.isotc211.org/${getOntologyPath(this.getFormValues())}`;
    }
  }

  let ontologyHeader = document.querySelector('.section.locator > h2');
  ontologyHeader.parentNode.insertBefore(
    (new OntologyLocator).render(),
    ontologyHeader.nextSibling);

}());
