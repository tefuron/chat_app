export function timeConvert(time: string) {
    // 不要な部分を切断
    const result1 = time.substring(0, 16)
    const date = new Date(result1)
    // UTCからJSTに変換するために9時間足す
    date.setHours(date.getHours() + 9)
    const str_date = date.toLocaleString("ja")
    // 秒数を削除するために後ろから検索
    const index = str_date.lastIndexOf(":")
    const result2 = str_date.substring(0, index)
    return result2
}