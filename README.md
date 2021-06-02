# urql-vue-ssr-issue ?

```
yarn
yarn dev
open http://localhost:8000
```

Server render should work however on the client, console will print "before await result..." 
but seems like that useQuery result never resolves?
