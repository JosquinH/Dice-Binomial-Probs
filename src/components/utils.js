
/**
 * Calcul des probabilités de succès. Elles sont calculé avec une loi binomial dont les chances de succès sont  1 - (diceMinValue -1)/diceNumberOfFaces
 * Le nombre d'épreuve (n) est diceNumber et le nombre de succès (k) est numberOfSuccess
 * Comme on ne cherche pas P(X=k) mais P(X>=k), il faudra calculé les P(X=x) pour x allant de k à n
 * 
 * Renvoie : - res : le résultat attendue
 *           - table_single_probs: un tableau des probabilité simple :  table_single_probs[k] =  P(X=k)
 *           - table_decrement_probs: un tableau des probabilité décroissante :  table_decrement_probs[k] = P(X>=k)
 */


export const computeProbs = ({ diceNumberOfFaces, diceNumber, numberOfSuccess, diceMinValue }) => {
    const pE = (diceMinValue - 1) / diceNumberOfFaces // probabilité d'échec
    const pS = 1 - pE // probabilité de succès

    let cur_PE = Math.pow(pE, diceNumber)
    let cur_PS = 1

    const table_single_probs = []
    const table_decrement_probs = []

    let res = 0
    let probs_decrement = 1 // Les valeurs successive pour table_decrement_probs

    let curBinomialCoefficient = 1 // Les coefficient binomiaux succesif pour le calcul des probabilités
    let curN = diceNumber

    for (let k = 0; k <= diceNumber; ++k) {

        if (k === diceNumber) cur_PE = 1

        const curProb = curBinomialCoefficient * cur_PS * cur_PE
        
        table_single_probs.push(curProb)
        table_decrement_probs.push(probs_decrement)

        if (k >= numberOfSuccess) {
            res += curProb
        }

        cur_PS = cur_PS * pS
        cur_PE = pE === 0 ? 0 : cur_PE / pE
        probs_decrement -= curProb
        curBinomialCoefficient *= curN / (k + 1)

        --curN
    }

    return ({
        res,
        table_single_probs,
        table_decrement_probs
    })

}
