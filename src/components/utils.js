/**
 * Calcul des probabilités de succès. Elles sont calculé avec une loi binomial dont les chances de succès sont  1 - diceMinValue/diceNumberOfFaces
 * Le nombre d'épreuve (n) est diceNumber et le nombre de succès (k) est numberOfSuccess
 * Comme on ne cherche pas P(X=k) mais P(X>=k), il faudra calculé les P(X=x) pour x allant de k à n
 * 
 * Renvoie : - res : le résultat attendue
 *           - table_single_probs: un tableau d'objet {k: P(X=k)}
 *           - table_decrement_probs: un tableau d'objet {k: P(X>=k)}
 */


export const computeProbs = ({ diceNumberOfFaces, diceNumber, numberOfSuccess, diceMinValue }) => {
    const pE = diceMinValue / diceNumberOfFaces
    const pS = 1 - pE

    let cur_PE = Math.pow(pE, diceNumber)
    let cur_PS = 1

    const n = diceNumber

    const table_single_probs = []
    const table_decrement_probs = []

    let probs_decrement = 1
    let res = 0

    for (let k = 0; k <= diceNumber; ++k) {
        const curBinomial = computeBinomialCoefficient(n, k)
        const curVal = curBinomial * cur_PS * cur_PE
        table_single_probs.push({ [k]: curVal })
        table_decrement_probs.push({ [k]: probs_decrement })
        if (k >= numberOfSuccess) {
            res += curVal
        }
        cur_PS = cur_PS * pS
        cur_PE = cur_PE / pE
        probs_decrement -= curVal
    }


    return ({
        res,
        table_single_probs,
        table_decrement_probs
    })

}

/**
 * Calcul le coefficient binomial "k parmi n" avec la formule  n! /((n-k)! * k!)
 */

const computeBinomialCoefficient = (n, k) => {
    if (k === 0 || n === k) {
        return 1
    } else {
        let res = 1
        let curN = n
        let curK = k
        while (curK > 0) {
            res *= (curN / curK)
            --curN
            --curK
        }
        return res
    }
}