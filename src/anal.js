function anal(total){
    const parent = new Date(total * 1000).toISOString().substring(5, 19);
    const seconds = parent.split(':')[2]
    const minutes = parent.split(':')[1]
    const hours = parent.substring(6, 8)
    const days = parent.substring(3, 5) - 1
    const months = parseInt(parent.substring(0, 2)) - 1
    let lettered;
    let analog;
    if(months > 0){
        lettered = `${months} months, ${days} days, ${hours} hr, ${minutes} min, ${seconds} sec`
        analog = `${months}:${days}:${hours}:${minutes}:${seconds}`
    }else{
        lettered = `${days} days, ${hours} hr, ${minutes} min, ${seconds} sec`
        analog = `${days}:${hours}:${minutes}:${seconds}`
    }
    return `${analog}`
}