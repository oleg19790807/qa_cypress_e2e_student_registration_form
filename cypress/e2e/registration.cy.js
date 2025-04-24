/// <reference types='cypress' />

describe('Student Registration page', () => {
  before(() => {
    // Visit the registration form before each test
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('should fill form, submit, and verify modal data', () => {
    // Test data
    const testData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      phone: '1234567890',
      dateOfBirth: {
        day: '15',
        month: 'May',
        year: '1995'
      },
      subjects: ['Maths', 'English'],
      hobbies: ['Sports', 'Reading'], // Will map to values 1 and 2
      address: '123 Main Street, City',
      state: 'NCR',
      city: 'Delhi'
    };

    // Fill form fields
    cy.get('#firstName').type(testData.firstName);
    cy.get('#lastName').type(testData.lastName);
    cy.get('#userEmail').type(testData.email);

    // Select gender
    cy.get(`input[name="gender"][value="${testData.gender}"]`).parent().click();

    cy.get('#userNumber').type(testData.phone);

    // Date of birth
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select(
      testData.dateOfBirth.month
    );
    cy.get('.react-datepicker__year-select').select(testData.dateOfBirth.year);
    cy.get(`.react-datepicker__day--0${testData.dateOfBirth.day}`).click();

    // Subjects
    testData.subjects.forEach((subject) => {
      cy.get('#subjectsInput').type(`${subject}{enter}`);
    });

    // Hobbies - Map hobby names to their corresponding values
    const hobbyValues = {
      Sports: '1',
      Reading: '2',
      Music: '3'
    };
    testData.hobbies.forEach((hobby) => {
      cy.get(`#hobbies-checkbox-${hobbyValues[hobby]}`).parent().click();
    });

    // Current Address
    cy.get('#currentAddress').type(testData.address);

    // State and City
    cy.get('#state').click();
    cy.get(`#react-select-3-option-0`).contains(testData.state).click();
    cy.get('#city').click();
    cy.get(`#react-select-4-option-0`).contains(testData.city).click();

    // Submit form
    cy.get('#submit').click();

    // Verify modal appears
    cy.get('.modal-content').should('be.visible');

    // Verify data in modal
    cy.get('tbody').within(() => {
      cy.get('tr')
        .eq(0)
        .should('contain', `${testData.firstName} ${testData.lastName}`);
      cy.get('tr').eq(1).should('contain', testData.email);
      cy.get('tr').eq(2).should('contain', testData.gender);
      cy.get('tr').eq(3).should('contain', testData.phone);
      cy.get('tr')
        .eq(4)
        .should(
          'contain',
          `${testData.dateOfBirth.day} ${testData.dateOfBirth.month},${testData.dateOfBirth.year}`
        );
      cy.get('tr').eq(5).should('contain', testData.subjects.join(', '));
      cy.get('tr').eq(6).should('contain', testData.hobbies.join(', '));
      cy.get('tr').eq(8).should('contain', testData.address);
      cy.get('tr')
        .eq(9)
        .should('contain', `${testData.state} ${testData.city}`);
    });

    // Close modal
    cy.get('#closeLargeModal').click();
  });
});
