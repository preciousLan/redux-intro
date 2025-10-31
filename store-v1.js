import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
	balance: 0,
	loan: 0,
	loanpurpose: '',
};

const initialStateCustomer = {
	fullName: '',
	nationalId: '',
	createdAt: '',
};

function accountreducer(state = initialStateAccount, action) {
	switch (action.type) {
		case 'account/deposit':
			return { ...state, balance: state.balance + action.payload };

		case 'account/withdraw':
			return { ...state, balance: state.balance - action.payload };

		case 'account/requestLoan':
			if (state.loan > 0) return;
			return {
				...state,
				loan: action.payload.amount,
				loanpurpose: action.payload.purpose,
				balance: state.balance + action.payload.amount,
			};

		case 'account/payLoan':
			return {
				...state,
				loan: 0,
				loanpurpose: '',
				balance: state.balance - state.loan,
			};

		default:
			return state;
	}
}

function customerReducer(state = initialStateCustomer, action) {
	switch (action.type) {
		case 'customer/createCustomer':
			return {
				...state,
				fullName: action.payload.fullName,
				nationalId: action.payload.nationalId,
				createdAt: action.payload.createdAt,
			};

		case 'customer/upadateName':
			return { ...state, fullName: action.payload };
		default:
			return state;
	}
}

const rootReducer = combineReducers({
    account: accountreducer,
    customer: customerReducer
})

const store = createStore(accountreducer);

// store.dispatch({type: "account/deposit", payload: 1500})
// console.log(store.getState())

// store.dispatch({type: "account/withdraw", payload: 500})
// console.log(store.getState())

// store.dispatch({type: "account/requestLoan", payload: {amount: 1000, purpose:"headd"}})
// console.log(store.getState())

function deposit(amount) {
	return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
	return { type: 'account/withdraw', payload: amount };
}
function requestLoan() {}

function payload() {}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

// ....................................................................

function createCustomer(fullName, nationalId) {
	return {
		type: 'customer/createCustomer',
		payload: { fullName, nationalId, createdAt: new Date().toDateString() },
	};
}

function updateName(fullName) {
	return { type: 'account/updateName', payload: fullName };
}
