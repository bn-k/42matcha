package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func testQuery(c *gin.Context) {
	c.Header("Content-Type", "application/json")
	fmt.Println("PostForm", c.PostForm("username"))
	fmt.Println("PostFArra", c.PostFormArray("username"))
	fmt.Println("PostFormMap", c.PostFormMap("username"))
	fmt.Println("Params", c.Params)
	fmt.Println("Param", c.Param("username"))
	fmt.Println("Query", c.Query("username"))
	fmt.Println("Req.PostForm", c.Request.PostForm)
	fmt.Println("Req.PostForm", c.Request.Proto)
}
