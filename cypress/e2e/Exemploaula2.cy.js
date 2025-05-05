/// <reference = cypress>

describe("Teste da criação, resgistro e login", ()=>{
    it.skip ("Teste criação de usuário com sucesso", ()=>{
         cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
         cy.get('.btn-link').click()
         cy.get('#firstName').type("Lívia")
         cy.get('#Text1').type("Silva")
         cy.get('#username').type("livia.silva")    
         cy.get('#password').type("123456")
         cy.get('.btn-primary').click()
         cy.get('.ng-binding').should("contain", "Registration successful")
    })

    it.skip ("Teste criação de usuário com falha", ()=>{
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('.btn-link').click()
        cy.get('#firstName').type("Lívia")
        cy.get('#Text1').type("Silva")
        cy.get('#username').type("livia.silva")    
        cy.get('.btn-primary').should("be.disabled")
    })
    it.skip ("Teste de login com sucesso", ()=>{
        let infos = criarUser()
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should("contain.text", infos[0])
    })
    // Atividade 2 - Teste de login com falha
    it ("Teste de login com Falha", ()=>{
        let infos = criarUser()
        cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('h1.ng-binding').should("contain.text", infos[0])
        cy.get('.ng-binding > a').click() // deleta o usuário
        // tenta fazer login novamente
        cy.get('.ng-binding').should("contain.text", "Hi !")
        cy.get('.btn').click()
        cy.get('#username').type(infos[0])
        cy.get('#password').type(infos[1])
        cy.get('.btn-primary').click()
        cy.get('.ng-binding').should("contain.text", "Username or password is incorrect")
    })
})

function criarUser(){
    let hora = new Date().getHours().toString()
    let minutos = new Date().getMinutes().toString()
    let segundos = new Date().getSeconds().toString()
    let ID = hora + minutos + segundos + "ID"
    let Senha = hora + minutos + segundos + "Senha"
    let infos = [ID, Senha]

    cy.visit("https://globalsqa.com/angularJs-protractor/registration-login-example/#/login")
    cy.get('.btn-link').click()
    cy.get('#firstName').type(ID)
    cy.get('#Text1').type(ID)
    cy.get('#username').type(ID)   
    cy.get('#password').type(Senha)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should("contain.text", "Registration successful")
    return infos
}