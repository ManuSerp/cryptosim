#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    int i;
    pid_t pid;
    for (i = 0; i < 10; i++) {
        pid = fork();
        if (pid == 0) {
            printf("I am child %d\n", i);
            exit(0);
        }
    }
    return 0;
}