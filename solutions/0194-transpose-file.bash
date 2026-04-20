awk '
{
    for (i = 1; i <= NF; i++) {
        if (NR == 1) {
            cols[i] = $i
        } else {
            cols[i] = cols[i] " " $i
        }
    }
}
END {
    for (i = 1; i <= NF; i++) {
        print cols[i]
    }
}' file.txt
