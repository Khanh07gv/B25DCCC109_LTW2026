import { MIN_BET, MAX_BET, BET_STEP, RESULTS, MULTIPLIERS } from './data';

export const validateBet = (bet, score) => {
    if (bet % BET_STEP !== 0 || bet < MIN_BET || bet > Math.min(MAX_BET, score)) {
        return "Mức cược phải là bội số của 100, từ 100 đến 500 và không vượt quá số điểm đang có";
    }
    return "";
};

export const calcChange = (bet, level, correct) => {
    return correct ? bet * MULTIPLIERS[level] : -bet;
};

export const getResult = (score) => {
    return RESULTS.find(r => score >= r.min) || RESULTS[RESULTS.length - 1];
};
