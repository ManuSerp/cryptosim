all: main

build:
	mkdir build

build/fork.o:
	gcc -o build/fork.o -c src/fork.c -O3


main : build build/fork.o
	gcc -o build/exe build/fork.o -O3

make clean:
	rm -f build/*.o build/exe ./exe 
	rm -d -f build
	rm -d -f base
