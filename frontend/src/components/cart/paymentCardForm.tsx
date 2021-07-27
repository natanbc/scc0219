import React from 'react';

import { Card } from '../cart';

import { FormInput } from '../materialize';

export interface Props {
    card: Card,
    setCard: (card: Card) => void,
}

export function PaymentCardForm({card, setCard}: Props): React.ReactElement {
    return <form>
        <div className="row">
            <FormInput name="cardNumber" type="text" value={card.number}
                wrapperClass="col s10"
                onChange={e => setCard({...card, number: e.target.value})}>
                Card Number
            </FormInput>
            <FormInput name="cardBrand" type="text" value={card.brand}
                wrapperClass="col s2"
                onChange={e => setCard({...card, brand: e.target.value})}>
                Card Brand
            </FormInput>
        </div>
        <div className="row">
            <FormInput name="cardHolderName" type="text" value={card.holderName}
                wrapperClass="col s12"
                onChange={e => setCard({...card, holderName: e.target.value})}>
                Card Holder Full Name
            </FormInput>
        </div>
        <div className="row">
            <FormInput name="cardHolderId" type="text" value={card.holderId}
                wrapperClass="col s10"
                onChange={e => setCard({...card, holderId: e.target.value})}>
                Card Holder CPF/CNPJ
            </FormInput>
            <FormInput name="securityCode" type="text" value={card.securityCode}
                wrapperClass="col s2"
                onChange={e => setCard({...card, securityCode: e.target.value})}>
                Security Code
            </FormInput>
        </div>
        <div className="row">
            <FormInput name="expirationMonth" type="number" value={card.month}
                min="1" max="12" wrapperClass="col s2"
                onChange={e => setCard({...card, month: e.target.valueAsNumber})}>
                Expiration Month
            </FormInput>
            <FormInput name="expirationYear" type="number" value={card.year}
                min="2021" wrapperClass="col s2"
                onChange={e => setCard({...card, year: e.target.valueAsNumber})}>
                Expiration Year
            </FormInput>
        </div>
    </form>;
}
